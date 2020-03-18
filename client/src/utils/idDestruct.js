export const newStatus = ob => {
	ob.forEach(element => {
		element.isAccordeonOpen = false;
 });
 return ob
};
