import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface IProps {
  name: string;
  label: string;
  isRequired?: boolean;
  isOptionalCaptionVisible?: boolean;
  isRequiredAstrictCaptionVisible?: boolean;
}

export default function RHFTextField({
  name,
  isRequired = true,
  isOptionalCaptionVisible = true,
  isRequiredAstrictCaptionVisible = true,
  label,
  ...other
}: IProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const { control, clearErrors } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-1">
          <Label className="text-sm font-medium" htmlFor={name}>
            {label}{" "}
            {isRequired
              ? isRequiredAstrictCaptionVisible && (
                  <span className="text-destructive align-middle">{" *"}</span>
                )
              : isOptionalCaptionVisible && (
                  <span className="text-muted-foreground font-normal text-xs">{`(optional)`}</span>
                )}
          </Label>
          <Input
            id={name}
            {...field}
            onChange={(e) => {
              field.onChange(e);
              clearErrors(name);
            }}
            className={error ? "border-destructive bg-destructive/10" : ""}
            {...other}
          />
          {error && (
            <p className="text-destructive text-xs mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
