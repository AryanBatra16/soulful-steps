import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = "Something went wrong", 
  message = "We couldn't load this content. Please try again.", 
  onRetry 
}: ErrorStateProps) {
  return (
    <Alert className="border-destructive/20">
      <AlertCircle className="h-4 w-4 text-destructive" />
      <AlertTitle className="text-destructive">{title}</AlertTitle>
      <AlertDescription className="mt-2">
        {message}
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="mt-3"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}