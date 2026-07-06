import "./style.css";
import { Box, Typography } from "@mui/material";

type ReviewSectionProps = {
  title: string;
  children: React.ReactNode;
};

function ReviewSection({ title, children }: ReviewSectionProps) {
  return (
    <Box className="review-section">
      <Typography variant="subtitle2">{title}</Typography>

      <Box className="review-section-content">{children}</Box>
    </Box>
  );
}

export default ReviewSection;
