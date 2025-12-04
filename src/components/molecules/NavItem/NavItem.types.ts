export interface NavItemProps {
  /**
   * Whether this navigation item contains a dropdown menu
   */
  hasDropdown?: boolean;
  
  /**
   * Whether this navigation item is currently active/selected
   */
  isActive?: boolean;
  
  /**
   * Additional CSS classes to apply
   */
  class?: string;
}
