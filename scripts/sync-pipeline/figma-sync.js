/**
 * Figma Sync Manager
 * Syncs design tokens and components from Figma to codebase
 */

import fs from 'fs/promises';
import path from 'path';
import { syncConfig } from './config.js';

class FigmaSync {
  constructor() {
    this.apiBase = 'https://api.figma.com/v1';
    this.headers = {
      'X-Figma-Token': syncConfig.figma.accessToken,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Fetch Figma file data
   */
  async fetchFigmaFile(fileKey) {
    try {
      const response = await fetch(`${this.apiBase}/files/${fileKey}`, {
        headers: this.headers
      });
      
      if (!response.ok) {
        throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching Figma file:', error);
      throw error;
    }
  }

  /**
   * Fetch Figma file styles (colors, text styles, etc.)
   */
  async fetchFigmaStyles(fileKey) {
    try {
      const response = await fetch(`${this.apiBase}/files/${fileKey}/styles`, {
        headers: this.headers
      });
      
      if (!response.ok) {
        throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching Figma styles:', error);
      throw error;
    }
  }

  /**
   * Sync all design tokens from Figma
   */
  async syncDesignTokens() {
    console.log('🎨 Syncing design tokens from Figma...');
    
    try {
      const fileKey = syncConfig.figma.fileKey;
      
      if (!fileKey) {
        console.warn('⚠️ No Figma file key configured');
        return;
      }
      
      // Fetch file data and styles
      const [fileData, stylesData] = await Promise.all([
        this.fetchFigmaFile(fileKey),
        this.fetchFigmaStyles(fileKey)
      ]);
      
      // Extract tokens from Figma
      const tokens = await this.extractTokensFromFigma(fileData, stylesData);
      
      // Update design tokens file
      await this.updateDesignTokens(tokens);
      
      console.log('✅ Design tokens synced successfully');
    } catch (error) {
      console.error('❌ Failed to sync design tokens:', error);
      throw error;
    }
  }

  /**
   * Extract design tokens from Figma data
   */
  async extractTokensFromFigma(fileData, stylesData) {
    const tokens = {
      colors: {},
      typography: {},
      spacing: {},
      borderRadius: {},
      shadows: {}
    };

    // Extract color tokens from styles
    if (stylesData.meta?.styles) {
      for (const style of stylesData.meta.styles) {
        if (style.style_type === 'FILL') {
          const colorToken = await this.extractColorToken(style, fileData);
          if (colorToken) {
            tokens.colors[colorToken.name] = colorToken.value;
          }
        }
        
        if (style.style_type === 'TEXT') {
          const textToken = await this.extractTextToken(style, fileData);
          if (textToken) {
            tokens.typography[textToken.name] = textToken.value;
          }
        }
        
        if (style.style_type === 'EFFECT') {
          const shadowToken = await this.extractShadowToken(style, fileData);
          if (shadowToken) {
            tokens.shadows[shadowToken.name] = shadowToken.value;
          }
        }
      }
    }

    // Extract spacing tokens from components
    const spacingTokens = this.extractSpacingTokens(fileData);
    tokens.spacing = { ...tokens.spacing, ...spacingTokens };

    // Extract border radius tokens
    const borderRadiusTokens = this.extractBorderRadiusTokens(fileData);
    tokens.borderRadius = { ...tokens.borderRadius, ...borderRadiusTokens };

    return tokens;
  }

  /**
   * Extract color token from Figma style
   */
  async extractColorToken(style, fileData) {
    try {
      // Find the node that uses this style
      const node = this.findNodeByStyleId(fileData.document, style.key);
      
      if (!node || !node.fills || !node.fills[0]) {
        return null;
      }
      
      const fill = node.fills[0];
      
      if (fill.type === 'SOLID') {
        const { r, g, b, a = 1 } = fill.color;
        const hex = this.rgbaToHex(r, g, b, a);
        
        return {
          name: this.sanitizeTokenName(style.name),
          value: hex
        };
      }
      
      return null;
    } catch (error) {
      console.warn(`Warning: Could not extract color token for ${style.name}`);
      return null;
    }
  }

  /**
   * Extract text token from Figma style
   */
  async extractTextToken(style, fileData) {
    try {
      const node = this.findNodeByStyleId(fileData.document, style.key);
      
      if (!node || !node.style) {
        return null;
      }
      
      const textStyle = node.style;
      
      return {
        name: this.sanitizeTokenName(style.name),
        value: {
          fontFamily: textStyle.fontFamily || 'inherit',
          fontSize: `${textStyle.fontSize || 16}px`,
          fontWeight: textStyle.fontWeight || 400,
          lineHeight: textStyle.lineHeightPx ? `${textStyle.lineHeightPx}px` : 'normal',
          letterSpacing: textStyle.letterSpacing ? `${textStyle.letterSpacing}px` : 'normal'
        }
      };
    } catch (error) {
      console.warn(`Warning: Could not extract text token for ${style.name}`);
      return null;
    }
  }

  /**
   * Extract shadow token from Figma style
   */
  async extractShadowToken(style, fileData) {
    try {
      const node = this.findNodeByStyleId(fileData.document, style.key);
      
      if (!node || !node.effects) {
        return null;
      }
      
      const effect = node.effects.find(e => e.type === 'DROP_SHADOW');
      
      if (!effect) {
        return null;
      }
      
      const { offset, radius, color } = effect;
      const { r, g, b, a = 1 } = color;
      const colorValue = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
      
      return {
        name: this.sanitizeTokenName(style.name),
        value: `${offset.x}px ${offset.y}px ${radius}px ${colorValue}`
      };
    } catch (error) {
      console.warn(`Warning: Could not extract shadow token for ${style.name}`);
      return null;
    }
  }

  /**
   * Extract spacing tokens from Figma components
   */
  extractSpacingTokens(fileData) {
    const spacingTokens = {};
    
    // Look for spacing components in the design system
    const spacingNodes = this.findNodesByName(fileData.document, /spacing|space|gap/i);
    
    spacingNodes.forEach(node => {
      if (node.absoluteBoundingBox) {
        const size = Math.max(node.absoluteBoundingBox.width, node.absoluteBoundingBox.height);
        const name = this.sanitizeTokenName(node.name);
        spacingTokens[name] = `${size}px`;
      }
    });
    
    return spacingTokens;
  }

  /**
   * Extract border radius tokens
   */
  extractBorderRadiusTokens(fileData) {
    const radiusTokens = {};
    
    // Look for border radius examples
    const radiusNodes = this.findNodesByName(fileData.document, /radius|corner|rounded/i);
    
    radiusNodes.forEach(node => {
      if (node.cornerRadius !== undefined) {
        const name = this.sanitizeTokenName(node.name);
        radiusTokens[name] = `${node.cornerRadius}px`;
      }
    });
    
    return radiusTokens;
  }

  /**
   * Find node by style ID
   */
  findNodeByStyleId(node, styleId) {
    if (node.styles && Object.values(node.styles).includes(styleId)) {
      return node;
    }
    
    if (node.children) {
      for (const child of node.children) {
        const found = this.findNodeByStyleId(child, styleId);
        if (found) return found;
      }
    }
    
    return null;
  }

  /**
   * Find nodes by name pattern
   */
  findNodesByName(node, pattern) {
    const matches = [];
    
    if (node.name && pattern.test(node.name)) {
      matches.push(node);
    }
    
    if (node.children) {
      for (const child of node.children) {
        matches.push(...this.findNodesByName(child, pattern));
      }
    }
    
    return matches;
  }

  /**
   * Convert RGBA to hex
   */
  rgbaToHex(r, g, b, a = 1) {
    const toHex = (c) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    
    if (a < 1) {
      return hex + toHex(a);
    }
    
    return hex;
  }

  /**
   * Sanitize token name for use in code
   */
  sanitizeTokenName(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Update design tokens file
   */
  async updateDesignTokens(newTokens) {
    const tokensPath = path.join(syncConfig.paths.tokens, 'tokens.js');
    
    try {
      // Read current tokens
      const { designTokens } = await import(path.resolve(tokensPath));
      
      // Merge new tokens with existing ones
      const updatedTokens = this.mergeTokens(designTokens, newTokens);
      
      // Generate new tokens file content
      const tokensContent = this.generateTokensFile(updatedTokens);
      
      // Write updated tokens
      await fs.writeFile(tokensPath, tokensContent);
      
      console.log('✅ Design tokens file updated');
    } catch (error) {
      console.error('Error updating design tokens:', error);
      throw error;
    }
  }

  /**
   * Merge new tokens with existing tokens
   */
  mergeTokens(existingTokens, newTokens) {
    const merged = { ...existingTokens };
    
    // Merge each token category
    Object.keys(newTokens).forEach(category => {
      if (merged[category] && typeof merged[category] === 'object') {
        merged[category] = {
          ...merged[category],
          ...newTokens[category]
        };
      } else {
        merged[category] = newTokens[category];
      }
    });
    
    return merged;
  }

  /**
   * Generate tokens file content
   */
  generateTokensFile(tokens) {
    return `/**
 * Hunter Galloway Design Tokens
 * Auto-generated from Figma - DO NOT EDIT MANUALLY
 * Last updated: ${new Date().toISOString()}
 */

export const designTokens = ${JSON.stringify(tokens, null, 2)};
`;
  }

  /**
   * Export Figma components as React components
   */
  async exportComponents() {
    console.log('🧩 Exporting components from Figma...');
    
    try {
      const fileKey = syncConfig.figma.fileKey;
      const fileData = await this.fetchFigmaFile(fileKey);
      
      // Find component nodes
      const components = this.findComponentNodes(fileData.document);
      
      for (const component of components) {
        await this.exportComponent(component);
      }
      
      console.log(`✅ Exported ${components.length} components from Figma`);
    } catch (error) {
      console.error('❌ Failed to export components:', error);
      throw error;
    }
  }

  /**
   * Find component nodes in Figma file
   */
  findComponentNodes(node) {
    const components = [];
    
    if (node.type === 'COMPONENT') {
      components.push(node);
    }
    
    if (node.children) {
      for (const child of node.children) {
        components.push(...this.findComponentNodes(child));
      }
    }
    
    return components;
  }

  /**
   * Export single component from Figma
   */
  async exportComponent(component) {
    // This would generate React/Astro components from Figma components
    // Implementation depends on specific requirements
    console.log(`Exporting component: ${component.name}`);
    
    // Could generate:
    // 1. React component with proper props
    // 2. Storybook story
    // 3. TypeScript types
    // 4. CSS classes
  }
}

export { FigmaSync };