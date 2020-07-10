module.exports = {
  theme: {
    customForms: (theme) => ({
      default: {
        checkbox: {
          backgroundColor: theme("colors.gray-900"),
          borderRadius: theme("borderRadius.sm"),
          borderColor: theme("border-gray-800"),
          "&:focus": {
            backgroundColor: theme("colors.orange-600"),
          },
        },
      },
    }),
  },
  plugins: [require("@tailwindcss/custom-forms")],
};
