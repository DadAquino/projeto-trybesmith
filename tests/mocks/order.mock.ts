const orderList = [
	{
		id: 1,
		userId: 1
	},
	{
		id: 2,
		userId: 3
	},
	{
		id: 3,
		userId: 2
	}
]

export const newOrder = {
	id: 2,
	userId: 1,
  };
  
  export const orderToAdd = {
	userId: 1,
	productIds: [1, 2],
  };
  
  export const orderWithoutUserId = {
	productIds: [1, 2],
  };
  
  export const orderWithoutProductIds = {
	userId: 1,
  };
  
  export const orderUserIdWithANumberAsString = {
	userId: '1',
	productIds: [1, 2],
  };
  
  export const orderUserIdAsString = {
	userId: 'as',
	productIds: [1, 2],
  };
  
  export const orderWithProductIdsDifferentOfNumber = {
	userId: 1,
	productIds: ['ww', 2],
  };

export default {
  orderList,
}


  