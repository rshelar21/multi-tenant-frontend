'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { useMutation } from '@tanstack/react-query';
import { postReviewAPI } from '@/api/reviews';
import { Textarea } from '@/components/ui/textarea';
import { StarPicker } from '@/components/common';
import { getQueryClient } from '@/lib/react-query';
import { Reviews } from '@/types/reviews';

interface ReviewFormProps {
  productId: string;
  data: Reviews;
}

const formSchema = z.object({
  description: z
    .string({
      required_error: 'description is Required',
    })
    .min(1, { message: 'description is Required' }),
  rating: z
    .number({
      required_error: 'rating is Required',
    })
    .min(1, { message: 'rating is Required' }),
});

type formSchemaType = z.infer<typeof formSchema>;

export const ReviewForm = ({ productId, data }: ReviewFormProps) => {
  const queryClient = getQueryClient();
  const [isPreview] = useState(!!data);
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      rating: 1,
    },
    mode: 'all',
  });

  useEffect(() => {
    if (data) {
      form.reset({
        description: data?.description,
        rating: data?.rating,
      });
    }
  }, [data, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: postReviewAPI,
    onError: (error) => {
      toast.error(`${error.message}`);
    },
    onSuccess: () => {
      toast.success('Review Added!');
      queryClient.invalidateQueries({
        queryKey: ['reviews'],
      });
    },
  });

  const onSubmit = async (values: formSchemaType): Promise<void> => {
    mutate({
      ...values,
      productId,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <p className="font-medium">
          {isPreview ? 'Your Rating' : 'Liked it? Give it a rating'}
        </p>

        <FormField
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <StarPicker
                  onChange={field.onChange}
                  value={field.value}
                  disabled={isPreview}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Want to leave a written review?"
                  disabled={isPreview}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="elevated"
          disabled={isPending || isPreview}
          type="submit"
          size="lg"
          className="hover:text-primary w-fit bg-black text-white hover:bg-pink-400"
        >
          Post review
        </Button>
      </form>
    </Form>
  );
};
