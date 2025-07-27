'use client';;
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { postTagAPI } from '@/api/products';
import { Input } from '@/components/ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  open: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  name: z
    .string({
      required_error: 'Name is Required',
    })
    .min(1, 'Name is Required'),
});

type formSchemaType = z.infer<typeof formSchema>;

export const CreateTagsModal = ({ onClose, open }: Props) => {
  const queryClient = useQueryClient();
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
    mode: 'all',
  });

  const handleClose = (): void => {
    form.reset();
    form.clearErrors();
    onClose();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: postTagAPI,
    onError: (error) => {
      toast.error(`${error.message}`);
    },
    onSuccess: async () => {
      toast.success('Tags Created!');
      await queryClient.invalidateQueries({
        queryKey: ['admin-tags'],
        refetchType: 'all',
      });
      handleClose();
    },
  });

  const onSubmit = async (values: formSchemaType): Promise<void> => {
    mutate({
      name: values.name,
    });
  };

  return (
    <Dialog open={open}>
      <DialogContent hideClose>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create Tag</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Tag Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className='pt-4'>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                size="sm"
                disabled={isPending}
                className="transition-colors hover:border-pink-400 hover:bg-pink-400 hover:text-black"
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
