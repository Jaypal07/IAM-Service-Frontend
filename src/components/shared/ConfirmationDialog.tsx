/**
 * Reusable Confirmation Dialog
 * Follows DRY and SOLID by extracting common confirmation logic
 */

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ConfirmationDialogProps {
    title: string;
    description: string;
    trigger: React.ReactNode;
    onConfirm: () => Promise<void> | void;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive' | 'outline';
}

export function ConfirmationDialog({
    title,
    description,
    trigger,
    onConfirm,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'default',
}: ConfirmationDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        try {
            setIsLoading(true);
            await onConfirm();
            setOpen(false);
        } catch (error) {
            console.error('Confirmation action failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className="text-zinc-500 dark:text-zinc-400">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6">
                    <div className="flex justify-end gap-3 w-full">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isLoading}
                        >
                            {cancelText}
                        </Button>
                        <Button
                            type="button"
                            variant={variant}
                            onClick={handleConfirm}
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {confirmText}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
