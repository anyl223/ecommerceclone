export const clsx = (...classes: (string | false | null | undefined)[]) => {
    return classes.filter((cls): cls is string => !!cls).join(" ");
  };
  
  export const isNotBlank = (val: any): val is string =>
    typeof val === "string" && val.trim().length > 0;
  
  export const isBlank = (val: any) => !isNotBlank(val);
  
  export const convertToDatePickerFormat = (date: Date | string) => {
    if (typeof date === "string") {
      return date.split("/").reverse().join("-");
    } else {
      return date.toLocaleDateString().split("/").reverse().join("-");
    }
  };
  