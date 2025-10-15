import { useFormContext, Controller } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface IProps {
  name: string;
  label: string;
  isRequired?: boolean;
  isOptionalCaptionVisible?: boolean;
  isRequiredAstrictCaptionVisible?: boolean;
}

export default function RHFPasswordField({
  name,
  isRequired = true,
  isOptionalCaptionVisible = true,
  isRequiredAstrictCaptionVisible = true,
  label,
  ...other
}: IProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const { control, clearErrors } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-1 relative">
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
          <div className="relative">
            <Input
              id={name}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                clearErrors(name);
              }}
              type={showPassword ? "text" : "password"}
              className={error ? "border-destructive bg-destructive/10 pr-10" : "pr-10"}
              {...other}
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <Eye className="h-4 w-4 text-muted-foreground" />
              ) : (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              )}
            </span>
          </div>
          {error && (
            <p className="text-destructive text-xs mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
