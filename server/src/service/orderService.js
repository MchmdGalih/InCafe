const { Order, Order_Item, Product, User } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { snap, apiClient } = require("../utils/midtrans");

const createOrderService = async ({
  userId,
  total_amount,
  items,
  firstName,
  lastName,
  email,
  phoneNumber,
}) => {
  const orderId = `ORD-${uuidv4()}`;
  let parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: parseInt(total_amount),
    },
    credit_card: {
      secure: true,
    },
    allow_retry: true,
    item_details: items.map((item) => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
      name: item.name,
    })),
    customer_details: {
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phoneNumber,
    },
    enabled_payments: ["qris", "gopay", "shopeepay", "bank_transfer"],
  };
  const snapData = await snap.createTransaction(parameter);

  if (!snapData) {
    throw new Error("Failed to create order with midtrans");
  }

  const newOrder = await Order.create({
    userId,
    total_amount,
    status: "pending",
    midtransOrderId: orderId,
    token: snapData.token,
  });

  const orderItems = items.map((item) => ({
    orderId: newOrder.id,
    productId: item.id,
    quantity: item.quantity,
  }));

  await Order_Item.bulkCreate(orderItems);

  if (!newOrder) {
    throw new Error("Failed to create order");
  }

  return { newOrder, snapData };
};

const getAllOrderService = async () => {
  const orders = await Order.findAll({
    include: [
      {
        model: Order_Item,
        include: {
          model: Product,
        },
      },
      {
        model: User,
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  if (!orders) {
    throw new Error("Failed to get orders");
  }

  return orders;
};

const getOrderByIdService = async (orderId) => {
  const order = await Order.findOne({
    where: {
      id: orderId,
    },
    include: [
      {
        model: Order_Item,
        include: {
          model: Product,
        },
      },
      {
        model: User,
      },
    ],
  });

  if (!order) {
    throw new Error("Tidak ada order dengan id tersebut");
  }

  return order;
};

const deleteOrderService = async (orderId) => {
  const order = await getOrderByIdService(orderId);

  await order.destroy();
};

const notificationStatusService = async (payload) => {
  const statusResponse = await apiClient.transaction.notification(payload);

  console.log("apiClinet", statusResponse);

  const { order_id, transaction_status } = statusResponse;

  let newStatus;
  switch (transaction_status) {
    case "settlement":
      newStatus = "paid";
      break;
    case "expire":
    case "cancel":
      newStatus = "canceled";
      break;
    case "deny":
      newStatus = "failed";
      break;
    default:
      newStatus = "pending";
      break;
  }
  const order = await Order.findOne({
    where: {
      midtransOrderId: order_id,
    },
  });
  if (!order) {
    throw new Error("Order tidak ditemukan");
  }

  await order.update({ status: newStatus });

  return order;
};

module.exports = {
  createOrderService,
  getAllOrderService,
  getOrderByIdService,
  deleteOrderService,
  notificationStatusService,
};
