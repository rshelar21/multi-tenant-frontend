'use client';
import { useMemo } from 'react';
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
import { Textarea } from '@/components/ui/textarea';

import { Input } from '@/components/ui/input';
import { useMutation, useQueries } from '@tanstack/react-query';
import { ReactSelect } from '@/components/common';
import {
  getProductTagsAPI,
  getProductCategoryAPI,
  postProductAPI,
} from '@/api/products';
import { getQueryClient } from '@/lib/react-query';
import { refundPolicyList } from '@/constants';
import { ImageUploader } from '@/components/common';
import { ImageUpload } from '@/services';

interface Props {
  open: boolean;
  onClose: () => void;
  isSuperAdmin: boolean;
}

const formSchema = z.object({
  name: z
    .string({
      required_error: 'Name is Required',
    })
    .min(1, 'Name is Required'),
  description: z
    .string({
      required_error: 'Description is Required',
    })
    .min(1, 'Description is required'),
  category: z
    .object({ label: z.string(), value: z.string() })
    .refine((val) => !!val.label && !!val.value, {
      message: 'Category is required',
    }),
  price: z
    .string({
      required_error: 'Price is Required',
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Price must be a valid number',
    }),
  tags: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .min(1, 'At least one tag must be selected'),
  refundPolicy: z
    .object({ label: z.string(), value: z.string() })
    .refine((val) => !!val.label && !!val.value, {
      message: 'Policy is required',
    }),
  productImg: z.instanceof(File),
});

type formSchemaType = z.infer<typeof formSchema>;

const queryConfigs = [
  { queryKey: ['tags'], queryFn: () => getProductTagsAPI('/tags') },
  { queryKey: ['category'], queryFn: getProductCategoryAPI },
];

export const CreateProductsModal = ({ onClose, open, isSuperAdmin }: Props) => {
  const results = useQueries({
    queries: queryConfigs,
  });
  const queryClient = getQueryClient();
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: {
        label: '',
        value: '',
      },
      description: '',
      name: '',
      price: '',
      tags: [],
      refundPolicy: {
        label: '',
        value: '',
      },
      productImg: undefined,
    },
    // mode: 'all',
  });

  const options = useMemo(() => {
    const tagsList = results[0].data;
    const categoryList = results[1].data;
    if (tagsList && categoryList) {
      const tags = tagsList?.data?.map((i) => ({
        label: i?.name,
        value: i?.id,
      }));
      const category = categoryList?.data?.map((i) => ({
        label: i?.name,
        value: i?.id,
      }));

      return {
        tagsList: tags,
        categoryList: category,
      };
    }

    return {
      tagsList: [],
      categoryList: [],
    };
  }, [results]);

  const handleClose = (): void => {
    form.reset();
    form.clearErrors();
    onClose();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: postProductAPI,
    onError: (error) => {
      toast.error(`${error.message}`);
    },
    onSuccess: async () => {
      toast.success('Product Created!');
      await queryClient.invalidateQueries({
        queryKey: ['admin-products', isSuperAdmin],
        refetchType: 'all',
      });
      handleClose();
    },
  });

  const onSubmit = async (values: formSchemaType): Promise<void> => {
    const res = await ImageUpload(values.productImg);

    mutate({
      category: values?.category?.value,
      description: values?.description,
      name: values?.name,
      price: values?.price,
      refundPolicy: values?.refundPolicy.value,
      tags: values?.tags?.map((i) => i.value) || [],
      productImg: res?.secure_url,
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
            Create Product
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full grid-cols-1 gap-4 pb-4 md:grid-cols-2">
              <div className="col-span-2 space-y-2 md:col-span-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Product Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 space-y-2 md:col-span-1">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Product Price</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 space-y-2 md:col-span-1">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field: { name, onChange, value } }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Select Category
                      </FormLabel>
                      <FormControl>
                        <ReactSelect
                          name={name}
                          isSearchable
                          options={options?.categoryList}
                          onChange={onChange}
                          value={value}
                          // className="dark:bg-input/30"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 space-y-2 md:col-span-1">
                <FormField
                  control={form.control}
                  name="refundPolicy"
                  render={({ field: { name, onChange, value } }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Select Refund Policy
                      </FormLabel>
                      <FormControl>
                        <ReactSelect
                          name={name}
                          isSearchable
                          options={refundPolicyList}
                          onChange={onChange}
                          value={value}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 space-y-2">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field: { name, onChange, value } }) => (
                    <FormItem>
                      <FormLabel className="text-base">Select Tags</FormLabel>
                      <FormControl>
                        <ReactSelect
                          isMultiSelect
                          name={name}
                          isSearchable
                          options={options?.tagsList}
                          onChange={onChange}
                          value={value}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Product Description
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} className="resize-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 space-y-2">
                <FormField
                  control={form.control}
                  name="productImg"
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUploader onChange={onChange} />
                      </FormControl>
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
