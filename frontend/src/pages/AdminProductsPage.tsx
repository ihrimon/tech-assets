// AdminProductsPage.tsx

import { PackageIcon, PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';

import { Navigate } from 'react-router';

import { formatPrice } from '../utils/format.js';
import { useAdminProductsPage } from '../hooks/useAdminProductsPage.js';
import { AdminProductsTableSkeleton } from '../components/LoadingSkeleton.js';

import { IK_PRESETS, imageKitOptimizedUrl } from '../lib/imageKitUrl.js';


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { AdminProductForm } from '../components/AdminProductForm.js';

function AdminProductsPage() {
  const {
    getToken,
    meData,
    modalOpen,
    setModalOpen,
    editing,
    setEditing,
    products,
    isLoading,
    saveMutation,
    deleteMutation,
  } = useAdminProductsPage();

  if (meData && meData.user?.role !== 'admin') {
    return <Navigate to='/' replace />;
  }

  function handleDeleteProduct(product) {
    if (!window.confirm(`Delete "${product.name}" permanently?`)) return;

    deleteMutation.mutate(product.id);
  }

  return (
    <div className='text-left'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
        <div className='flex items-center gap-3'>
          <PackageIcon className='h-8 w-8 text-primary' />

          <div>
            <h1 className='text-2xl font-bold'>Products</h1>

            <p className='text-sm text-muted-foreground'>
              Manage catalog (admin only).
            </p>
          </div>
        </div>

        <Button
          size='sm'
          className='gap-2'
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
        >
          <PlusIcon className='h-4 w-4' />
          Add product
        </Button>
      </div>

      {isLoading ? (
        <AdminProductsTableSkeleton />
      ) : (
        <div className='overflow-x-auto rounded-2xl border bg-card'>
          <table className='w-full text-sm'>
            <thead className='border-b bg-muted/50'>
              <tr>
                <th className='p-4 text-left font-medium'>Preview</th>
                <th className='p-4 text-left font-medium'>Name</th>
                <th className='p-4 text-left font-medium'>Category</th>
                <th className='p-4 text-left font-medium'>Slug</th>
                <th className='p-4 text-left font-medium'>Price</th>
                <th className='p-4 text-left font-medium'>Active</th>
                <th className='p-4 text-right font-medium'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className='border-b transition-colors hover:bg-muted/40'
                >
                  <td className='p-4'>
                    <div className='relative h-16 w-16 overflow-hidden rounded-xl border bg-muted shadow-sm'>
                      {p.imageUrl ? (
                        <img
                          src={imageKitOptimizedUrl(
                            p.imageUrl,
                            IK_PRESETS.adminThumb,
                          )}
                          alt=''
                          className='h-full w-full object-cover'
                        />
                      ) : (
                        <div className='flex h-full w-full items-center justify-center bg-linear-to-br from-muted to-muted/60'>
                          <PackageIcon className='h-6 w-6 text-muted-foreground/50' />
                        </div>
                      )}
                    </div>
                  </td>

                  <td className='p-4 font-medium'>{p.name}</td>

                  <td className='p-4'>
                    <Badge variant='secondary'>{p.category ?? '-'}</Badge>
                  </td>

                  <td className='p-4 font-mono text-sm text-muted-foreground'>
                    {p.slug}
                  </td>

                  <td className='p-4'>
                    {formatPrice(p.priceCents, p.currency)}
                  </td>

                  <td className='p-4'>
                    {p.active ? (
                      <Badge className='bg-green-600 hover:bg-green-600'>
                        yes
                      </Badge>
                    ) : (
                      <Badge variant='outline'>no</Badge>
                    )}
                  </td>

                  <td className='p-4'>
                    <div className='flex justify-end gap-2'>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='gap-1'
                        onClick={() => {
                          setEditing(p);
                          setModalOpen(true);
                        }}
                      >
                        <PencilIcon className='h-3 w-3' />
                        Edit
                      </Button>

                      <Button
                        size='sm'
                        variant='ghost'
                        className='gap-1 text-destructive hover:text-destructive'
                        disabled={
                          deleteMutation.isPending &&
                          deleteMutation.variables === p.id
                        }
                        onClick={() => handleDeleteProduct(p)}
                      >
                        {deleteMutation.isPending &&
                        deleteMutation.variables === p.id ? (
                          <span className='h-3 w-3 animate-spin rounded-full border border-current border-t-transparent' />
                        ) : (
                          <Trash2Icon className='h-3 w-3' />
                        )}
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);

          if (!open) {
            setEditing(null);
          }
        }}
      >
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader>
            <DialogTitle>
              {editing ? 'Edit product' : 'New product'}
            </DialogTitle>
          </DialogHeader>

          <AdminProductForm
            key={editing?.id ?? 'new'}
            initial={editing}
            saving={saveMutation.isPending}
            error={saveMutation.isError}
            getToken={getToken}
            onCancel={() => {
              setModalOpen(false);
              setEditing(null);
            }}
            onSubmit={(body) =>
              saveMutation.mutate({
                body,
                id: editing?.id,
              })
            }
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminProductsPage;
