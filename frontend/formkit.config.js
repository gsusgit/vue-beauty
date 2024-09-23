import { generateClasses } from '@formkit/themes'

const config = {
    config: {
        classes: generateClasses({
            global: {
                wrapper: 'space-y-2 mb-3',
                input: 'p-3 w-full border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400',
                message: 'text-white text-center bg-red-500 text-sm font-bold uppercase p-2 my-5',
                label: 'text-white'
            },
            submit: {
                input: '$reset text-white bg-blue-500 hover:bg-blue-700 w-full p-3 mt-10 rounded-lg font-bold uppercase'
            }
        })
    }
}

export default config
