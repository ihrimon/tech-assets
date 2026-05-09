import { useState } from 'react';
import { UploadCloudIcon, Loader2Icon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Card } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { uploadImageToImageKit } from '../lib/imagekitUpload.js';
import { IK_PRESETS, imageKitOptimizedUrl } from '../lib/imageKitUrl.js';

export function AdminProductForm({
  initial,
  saving,
  error,
  getToken,
  onCancel,
  onSubmit,
}) {
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [name, setName] = useState(initial?.name ?? '');
  const [category, setCategory] = useState(initial?.category ?? 'General');
  const [description, setDescription] = useState(initial?.description ?? '');

  const [priceCents, setPriceCents] = useState(
    initial ? String(initial.priceCents / 100) : '',
  );

  const [currency, setCurrency] = useState(initial?.currency ?? 'usd');

  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? '');

  const [imageKitFileId, setImageKitFileId] = useState(
    initial?.imageKitFileId ?? '',
  );

  const [active, setActive] = useState(initial?.active ?? true);

  const [uploadingImage, setUploadingImage] = useState(false);

  const [uploadError, setUploadError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const dollars = Number.parseFloat(priceCents);

    if (Number.isNaN(dollars) || dollars <= 0) return;

    const body = {
      slug: slug.trim(),
      name: name.trim(),
      category: category.trim() || 'General',
      description: description.trim(),
      priceCents: Math.round(dollars * 100),
      currency: currency.trim().toLowerCase(),
      imageUrl: imageUrl.trim() || null,
      imageKitFileId: imageKitFileId.trim() || null,
      active,
    };

    if (initial) {
      const patch = {};

      if (body.name !== initial.name) patch.name = body.name;

      if (body.category !== (initial.category ?? 'General')) {
        patch.category = body.category;
      }

      if (body.description !== initial.description) {
        patch.description = body.description;
      }

      if (body.priceCents !== initial.priceCents) {
        patch.priceCents = body.priceCents;
      }

      if (body.currency !== initial.currency) {
        patch.currency = body.currency;
      }

      if ((body.imageUrl ?? '') !== (initial.imageUrl ?? '')) {
        patch.imageUrl = body.imageUrl;
      }

      if ((body.imageKitFileId ?? null) !== (initial.imageKitFileId ?? null)) {
        patch.imageKitFileId = body.imageKitFileId;
      }

      if (body.active !== initial.active) {
        patch.active = body.active;
      }

      if (Object.keys(patch).length === 0) {
        onCancel();
        return;
      }

      onSubmit(patch);
    } else {
      onSubmit(body);
    }
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];

    e.target.value = '';

    if (!file) return;

    setUploadError(null);

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File is too large (max 10MB).');

      return;
    }

    const ext = file.name.includes('.')
      ? file.name.slice(file.name.lastIndexOf('.'))
      : '.jpg';

    const base = (slug.trim() || 'product')
      .replace(/[^\w-]+/g, '-')
      .slice(0, 80);

    setUploadingImage(true);

    try {
      const { url, fileId } = await uploadImageToImageKit(file, getToken, {
        fileName: `${base}-${Date.now()}${ext}`,
      });

      setImageUrl(url);
      setImageKitFileId(fileId ?? '');
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploadingImage(false);
    }
  }

  return (
    <form className='mt-5 space-y-5' onSubmit={handleSubmit}>
      <div className='space-y-2'>
        <Label htmlFor='slug'>Slug</Label>

        <Input
          id='slug'
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          disabled={Boolean(initial)}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='name'>Name</Label>

        <Input
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='category'>Category</Label>

        <Input
          id='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder='e.g. Audio, Workspace'
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='description'>Description</Label>

        <Textarea
          id='description'
          className='min-h-28 resize-none'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='price'>Price (USD)</Label>

          <Input
            id='price'
            type='number'
            step='0.01'
            min='0.01'
            value={priceCents}
            onChange={(e) => setPriceCents(e.target.value)}
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='currency'>Currency</Label>

          <Input
            id='currency'
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
          />
        </div>
      </div>

      <div className='space-y-3'>
        <Label>Product Image</Label>

        <div className='flex flex-wrap items-center gap-3'>
          <Button
            type='button'
            variant='secondary'
            disabled={uploadingImage || saving}
            className='relative overflow-hidden'
          >
            {uploadingImage ? (
              <>
                <Loader2Icon className='mr-2 size-4 animate-spin' />
                Uploading...
              </>
            ) : (
              <>
                <UploadCloudIcon className='mr-2 size-4' />
                Upload to ImageKit
              </>
            )}

            <input
              type='file'
              accept='image/png,image/jpeg,image/webp,image/gif'
              className='absolute inset-0 cursor-pointer opacity-0'
              disabled={uploadingImage || saving}
              onChange={handleImageUpload}
            />
          </Button>

          <p className='text-xs text-muted-foreground'>
            PNG, JPG, WebP, GIF · max 10MB
          </p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='image-url'>Image URL</Label>

          <Input
            id='image-url'
            type='url'
            value={imageUrl}
            onChange={(e) => {
              const v = e.target.value;

              if (v !== imageUrl) {
                setImageKitFileId('');
              }

              setImageUrl(v);
            }}
            placeholder='https://example.com/image.jpg'
          />
        </div>

        {uploadError ? (
          <Alert variant='destructive'>
            <AlertDescription>{uploadError}</AlertDescription>
          </Alert>
        ) : null}

        {imageUrl ? (
          <Card className='overflow-hidden p-3'>
            <img
              src={imageKitOptimizedUrl(imageUrl, IK_PRESETS.formPreview)}
              alt='Preview'
              className='mx-auto max-h-40 w-auto rounded-md object-contain'
              decoding='async'
            />
          </Card>
        ) : null}
      </div>

      <div className='flex items-center justify-between rounded-lg border p-4'>
        <div>
          <p className='font-medium'>Active in store</p>

          <p className='text-sm text-muted-foreground'>
            Customers can purchase this product.
          </p>
        </div>

        <Switch checked={active} onCheckedChange={setActive} />
      </div>

      {error ? (
        <Alert variant='destructive'>
          <AlertDescription>
            Save failed. Check slug uniqueness & fields.
          </AlertDescription>
        </Alert>
      ) : null}

      <div className='flex justify-end gap-3 pt-2'>
        <Button type='button' variant='outline' onClick={onCancel}>
          Cancel
        </Button>

        <Button type='submit' disabled={saving || uploadingImage}>
          {saving ? (
            <>
              <Loader2Icon className='mr-2 size-4 animate-spin' />
              Saving...
            </>
          ) : (
            'Save Product'
          )}
        </Button>
      </div>
    </form>
  );
}
