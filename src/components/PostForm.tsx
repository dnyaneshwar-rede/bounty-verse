// src/components/PostForm.tsx

'use client';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Tiptap  from '@/components/tiptap/editor';
import { FileUpload } from '@/components/file-upload';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { createBounty } from '@/lib/actions/bounty';
import { ProtectedComponent } from '@/components/auth/protected';

// Define the form schema using zod
const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(120),
  contentHtml: z.string().min(50, 'Description must be at least 50 characters'),
  reward: z.number().min(0).max(1000000),
  deadline: z.date().optional(),
  attachments: z.array(z.string()).optional(),
});

// Infer the form data type from the schema
type FormData = z.infer<typeof formSchema>;

export default function CreateBountyPage() {
  const { toast } = useToast();
  const { control, register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      contentHtml: '',
      reward: 0,
      attachments: [],
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createBounty(data);
      toast({ title: 'Bounty Created!', description: 'Your bounty is now live.' });
    } catch (error) {
      // Specify a more appropriate type for the error
      const errorMessage = (error as Error).message || 'An unexpected error occurred.';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <ProtectedComponent>
      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Title</label>
              <input
                {...register('title')}
                className="w-full p-2 border rounded-md"
                placeholder="Enter bounty title"
              />
              {errors.title && (
                <p className="text-red-500 mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Description</label>
              <Controller
                name="contentHtml"
                control={control}
                render={({ field }) => (
                  <Tiptap
                    content={field.value}
                    onChange={field.onChange}
                    className="min-h-[300px]"
                  />
                )}
              />
              {errors.contentHtml && (
                <p className="text-red-500 mt-1">{errors.contentHtml.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">Reward ($)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('reward', { valueAsNumber: true })}
                  className="w-full p-2 border rounded-md"
                />
                {errors.reward && (
                  <p className="text-red-500 mt-1">{errors.reward.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">Deadline</label>
                <input
                  type="date"
                  {...register('deadline', { valueAsDate: true })}
                  className="w-full p-2 border rounded-md"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Attachments</label>
              <Controller
                name="attachments"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    value={field.value || []}
                    onChange={field.onChange}
                    maxFiles={5}
                    maxSize={10 * 1024 * 1024}
                  />
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Create Bounty
          </Button>
        </form>
      </div>
    </ProtectedComponent>
  );
}