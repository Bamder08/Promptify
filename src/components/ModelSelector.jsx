import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const models = [
  { name: "GPT-3.5", value: "gpt-3.5-turbo" },
  { name: "GPT-4", value: "gpt-4" },
  { name: "Gemini Pro", value: "gemini-pro" },
];

export default function ModelSelector({ selectedModel, setSelectedModel }) {
  return (
    <div className="w-full max-w-sm mx-auto mb-6">
      <Listbox value={selectedModel} onChange={setSelectedModel}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-900 py-2 pl-4 pr-10 text-left border border-gray-600 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <span className="block truncate">
              {
                models.find((model) => model.value === selectedModel)?.name ||
                "Selecciona modelo"
              }
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-300" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
              {models.map((model, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-600 text-white" : "text-gray-200"
                    }`
                  }
                  value={model.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {model.name}
                      </span>
                      {selected && (
                        <span className="absolute left-2 inset-y-0 flex items-center text-blue-300">
                          <CheckIcon className="h-5 w-5" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}