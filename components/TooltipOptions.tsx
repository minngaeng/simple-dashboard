const TooltipOptions = () => {
  return {
    displayColors: false,
    borderColor: 'rgb(229, 231, 235)',
    borderWidth: 1,
    caretSize: 0,
    caretPadding: 15,
    enabled: true,
    backgroundColor: 'rgb(255,255,255)',
    boxWidth: 1,
    bodyColor: 'rgb(75, 85, 99)',
    bodyFont: {
      size: 14,
      family: 'Arial',
      style: 'normal',
      weight: 'normal',
      lineHeight: 1.2,
    },
    callbacks: {
      title: function () {
        return '';
      },
      label: function (context: any) {
        const value = context.parsed.y;
        if (value !== null) {
          const formattedValue =
            value >= 1000
              ? `$${(value / 1000).toFixed(1)}K`
              : `$${value.toString()}`;
          return formattedValue;
        }
        return '';
      },
    },
  };
};

export default TooltipOptions;

// label: function (context: any) {
//   let label = context.dataset.label || '';

//   if (label) {
//     label += ': ';
//   }
//   if (context.parsed.y !== null) {
//     label += new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(context.parsed.y);
//   }
//   return label;
// },
