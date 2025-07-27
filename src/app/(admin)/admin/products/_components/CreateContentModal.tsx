'use client';
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
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { useMutation, useQueryClient} from '@tanstack/react-query';
import { RichTextEditer } from '@/components/common';
import { postProductContentAPI } from '@/api/products';
import { useEffect } from 'react';
import { Content, IProduct } from '@/types/product';

interface Props {
  open: boolean;
  onClose: () => void;
  isSuperAdmin: boolean;
  productId: string;
  initialContent: Content[];
  data: Partial<IProduct> | null;
}

const BlockNoteBlockSchema = z.object({
  id: z.string(),
  type: z.string(),
  content: z.array(z.any()).optional(),
  props: z.record(z.any()).optional(),
  children: z.array(z.any()).optional(),
});

const formSchema = z.object({
  content: z.array(BlockNoteBlockSchema).min(1, 'Name is Required'),
});

type formSchemaType = z.infer<typeof formSchema>;

export const CreateContentModal = ({
  onClose,
  open,
  isSuperAdmin,
  productId,
  data,
}: Props) => {
  const queryClient = useQueryClient();
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: [],
    },
  });

  useEffect(() => {
    if (data?.content) {
      form.reset({
        content: data?.content || [],
      });
    }
  }, [data, form]);

  const handleClose = (): void => {
    form.reset({
      content: [],
    });
    form.clearErrors();
    onClose();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: postProductContentAPI,
    onError: (error) => {
      toast.error(`${error.message}`);
    },
    onSuccess: async () => {
      toast.success('Content Created!');
      await queryClient.invalidateQueries({
        queryKey: ['admin-products', isSuperAdmin],
        refetchType: 'all',
      });
      handleClose();
    },
  });

  const onSubmit = async (values: formSchemaType): Promise<void> => {
    mutate({
      content: JSON.stringify(values.content),
      id: productId,
    });
  };

  return (
    <Dialog open={open}>
      <DialogContent
        hideClose
        className="max-h-[90vh] overflow-y-auto sm:max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create Content
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="min-h-[200px] w-full py-6 pt-2">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <FormControl>
                        <RichTextEditer
                          onChange={onChange}
                          initialContent={value}
                          isEditable
                        />
                      </FormControl>
                      <FormDescription className="py-2">
                        Note: Content will be available to the user after
                        purchase.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
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
