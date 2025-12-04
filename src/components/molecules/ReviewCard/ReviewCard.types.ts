/**
 * ReviewCard Component Types
 * Hunter Galloway Design System - Molecular Component
 */

export interface ReviewCardProps {
  name: string;
  image: string;
  text: string;
  rating: number;
  isExpanded?: boolean;
  hasReadMore?: boolean;
  className?: string;
}

export default ReviewCardProps;