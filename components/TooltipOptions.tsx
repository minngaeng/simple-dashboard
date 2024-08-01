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
      label: function (context: any) {
        if (context.parsed.y !== null) {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(context.parsed.y);
        }
        return '';
      },
    },
  };
};

export default TooltipOptions;
