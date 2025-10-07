"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Copy, 
  Download,
  Archive
} from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "../ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";

interface AdminActionButtonProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onCopy?: () => void;
  onDownload?: () => void;
  onArchive?: () => void;
  customActions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    variant?: "default" | "destructive" | "secondary";
  }>;
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?: "ghost" | "outline" | "default";
  disabled?: boolean;
}

function AdminActionButton({
  onEdit,
  onDelete,
  onView,
  onCopy,
  onDownload,
  onArchive,
  customActions = [],
  className,
  size = "sm",
  variant = "ghost",
  disabled = false
}: AdminActionButtonProps) {
  const hasActions = onEdit || onDelete || onView || onCopy || onDownload || onArchive || customActions.length > 0;

  if (!hasActions) {
    return null;
  }

  // If only one action, show it as a direct button
  const actionCount = [
    onEdit, onDelete, onView, onCopy, onDownload, onArchive
  ].filter(Boolean).length + customActions.length;

  if (actionCount === 1) {
    if (onEdit) {
      return (
        <Button
          variant={variant}
          size={size}
          onClick={onEdit}
          disabled={disabled}
          className={cn("transition-all duration-200 hover:scale-105", className)}
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      );
    }
    if (onDelete) {
      return (
        <AlertDialog >
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size={size}
              disabled={disabled}
              className={cn("transition-all duration-200 hover:scale-105", className)}
              >
              <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this item form the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} >Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        // <Button
        //   variant="destructive"
        //   size={size}
        //   onClick={onDelete}
        //   disabled={disabled}
        //   className={cn("transition-all duration-200 hover:scale-105", className)}
        // >
        //   <Trash2 className="h-4 w-4" />
        //   <span className="sr-only">Delete</span>
        // </Button>
      );
    }
    if (onView) {
      return (
        <Button
          variant={variant}
          size={size}
          onClick={onView}
          disabled={disabled}
          className={cn("transition-all duration-200 hover:scale-105", className)}
        >
          <Eye className="h-4 w-4" />
          <span className="sr-only">View</span>
        </Button>
      );
    }
  }

  // Multiple actions - show as dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          disabled={disabled}
          className={cn(
            "transition-all duration-200 hover:scale-105 hover:bg-muted/80",
            className
          )}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {onView && (
          <DropdownMenuItem onClick={onView} className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>
        )}
        
        {onEdit && (
          <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}
        
        {onCopy && (
          <DropdownMenuItem onClick={onCopy} className="cursor-pointer">
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </DropdownMenuItem>
        )}
        
        {onDownload && (
          <DropdownMenuItem onClick={onDownload} className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" />
            Download
          </DropdownMenuItem>
        )}
        
        {onArchive && (
          <DropdownMenuItem onClick={onArchive} className="cursor-pointer">
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </DropdownMenuItem>
        )}

        {customActions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            className={cn(
              "cursor-pointer",
              action.variant === "destructive" && "text-destructive focus:text-destructive"
            )}
          >
            {action.icon && <span className="mr-2 h-4 w-4">{action.icon}</span>}
            {action.label}
          </DropdownMenuItem>
        ))}
        
        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={onDelete} 
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AdminActionButton;
export type { AdminActionButtonProps };
