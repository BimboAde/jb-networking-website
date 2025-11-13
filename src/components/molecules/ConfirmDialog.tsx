'use client';
import { useState, useCallback } from 'react';

type ConfirmOptions = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
};

export function useConfirm() {
  const [state, setState] = useState<{ open: boolean; resolve?: (v: boolean) => void; opts?: ConfirmOptions }>({ open: false });
  const confirm = useCallback((opts?: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => setState({ open: true, resolve, opts }));
  }, []);
  const Dialog = () =>
    state.open ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
          <h3 className="text-lg font-semibold text-brand-green mb-2">{state.opts?.title || 'Please Confirm'}</h3>
          <p className="text-gray-700 mb-6">{state.opts?.message || 'Are you sure?'}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                state.resolve?.(false);
                setState({ open: false });
              }}
              className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {state.opts?.cancelText || 'Cancel'}
            </button>
            <button
              onClick={() => {
                state.resolve?.(true);
                setState({ open: false });
              }}
              className="px-4 py-2 rounded bg-brand-green text-white hover:bg-brand-light-green"
            >
              {state.opts?.confirmText || 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    ) : null;
  return { confirm, ConfirmDialog: Dialog };
}


