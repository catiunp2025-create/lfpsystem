import { Box, Typography } from "@mui/material";

type ReviewFieldProps = {
  label: string;
  value?: string;
  fullWidth?: boolean;
};

function ReviewField({ label, value, fullWidth }: ReviewFieldProps) {
  return (
    <Box
      sx={{
        gridColumn: fullWidth ? "span 2" : "auto",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>

      <Typography>{value || "-"}</Typography>
    </Box>
  );
}

export default ReviewField;
