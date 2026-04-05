import { AlertTriangleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorAlert({ message, onRetry }: ErrorAlertProps) {
  return (
    <Alert variant="destructive">
      <AlertTriangleIcon />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <span>{message}</span>
        {onRetry && (
          <Button
            variant="link"
            size="sm"
            onClick={onRetry}
            className="h-auto self-start p-0 text-destructive underline-offset-4"
          >
            Try again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
