import React, { Component, Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { Dialog, Transition } from '@headlessui/react';

let resolve;

const defaultProps = {
  title: 'Confirmation',
  message: 'Are you sure?',
};
class Confirm extends Component {
  static create(props = {}) {
    if (typeof window === 'object') {
      const containerElement = document?.createElement('div');
      document?.body.appendChild(containerElement);
      const root = createRoot(containerElement)
      return root.render(<Confirm createConfirmProps={props} />);
    }
  }

  constructor() {
    super();

    this.state = {
      isOpen: false,
      showConfirmProps: {},
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.show = this.show.bind(this);
  }

  handleCancel() {
    this.setState({ isOpen: false });
    resolve(false);
  }

  handleConfirm() {
    this.setState({ isOpen: false });
    resolve(true);
  }

  show(props = {}) {
    const showConfirmProps = { ...this.props.createConfirmProps, ...props };
    this.setState({ isOpen: true, showConfirmProps });
    return new Promise((res) => {
      resolve = res;
    });
  }

  render() {
    const { isOpen, showConfirmProps } = this.state;
    const { message, title, confirmBtn, cancelBtn, ...rest } = showConfirmProps;
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50"
          onClose={this.handleCancel}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md px-5 py-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-sm">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title || defaultProps.title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {message || defaultProps.message}
                  </p>
                </div>

                <div className="mt-4 flex justify-end align-middle w-full">
                  <button
                    type="button"
                    className="inline-flex justify-center px-3 py-1.5 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                    onClick={this.handleCancel}
                  >
                    {cancelBtn || 'Cancela'}
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-3 py-1.5 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-md hover:bg-sky-500 hover:text-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ml-1"
                    onClick={this.handleConfirm}
                  >
                    {confirmBtn || 'Confirmar'}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  }
}

export default Confirm.create({});
