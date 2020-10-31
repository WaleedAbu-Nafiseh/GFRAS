import { useToast } from '@chakra-ui/core';

export function useSuccessToast() {
	const toast = useToast();

	return (options) => {
		toast({
			status: 'success',
			duration: 5000,
			isClosable: false,
			...options
		});
	};
}

export function useFailureToast() {
	const toast = useToast();

	return (options) => {
		toast({
			status: 'error',
			duration: 5000,
			isClosable: false,
			...options
		});
	};
}
