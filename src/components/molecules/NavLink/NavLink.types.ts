export interface NavLinkProps {
  /**
   * The URL the navigation link points to
   */
  href: string;
  
  /**
   * Whether this navigation link has a dropdown menu
   */
  hasDropdown?: boolean;
  
  /**
   * Whether this navigation link is currently active/selected
   */
  isActive?: boolean;
  
  /**
   * Whether to show a chevron indicator
   */
  showChevron?: boolean;
  
  /**
   * Direction of the chevron indicator
   */
  chevronDirection?: 'down' | 'right';
  
  /**
   * Additional CSS classes to apply
   */
  class?: string;
}
