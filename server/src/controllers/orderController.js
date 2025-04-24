const {
  createOrderService,
  getAllOrderService,
  getOrderByIdService,
  deleteOrderService,
  notificationStatusService,
} = require("../service/orderService");

const createOrderHandler = async (req, res) => {
  try {
    const {
      userId,
      total_amount,
      items,
      firstName,
      lastName,
      email,
      phoneNumber,
    } = req.body;

    const { newOrder, snapData } = await createOrderService({
      userId,
      total_amount,
      items,
      firstName,
      lastName,
      email,
      phoneNumber,
    });

    return res.status(201).json({
      message: "Order create successfuly",
      data: {
        order: newOrder,
        snapToken: snapData.token,
        redirect_url: snapData.redirect_url,
      },
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something wrong",
      error: error.message,
    });
  }
};

const getAllOrderHandler = async (req, res) => {
  try {
    const order = await getAllOrderService();
    return res.status(200).json({
      data: order,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something wrong",
      error: error.message,
    });
  }
};

const getOrderByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await getOrderByIdService(id);
    return res.status(200).json({
      data: order,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something wrong",
      error: error.message,
    });
  }
};

const deleteOrderHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteOrderService(id);

    return res.status(200).json({
      message: "Order berhasil dihapus",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something wrong",
      error: error.message,
    });
  }
};

const notificationHandler = async (req, res) => {
  const payload = req.body;
  try {
    const orderUpdate = await notificationStatusService(payload);
    return res.status(200).json({
      message: "Order status updated successfully",
      data: orderUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something wrong",
      error: error.message,
    });
  }
};

module.exports = {
  createOrderHandler,
  getAllOrderHandler,
  getOrderByIdHandler,
  deleteOrderHandler,
  notificationHandler,
};
