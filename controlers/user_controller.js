const { User } = require("../models")
const Checkout = require("../models/Checkout");
const user_service = require("../services/user_service")


exports.users_get = async (req, res, next) => {
  const allUsers = await user_service.getAllUsers();
 return res.send(allUsers)
}

exports.checkout_status_post = async (req, res, next) => {
  const userId = req.params.userId
  const checkoutId = req.params.checkoutId
  const state = req.body.state
  const changeOrden = await user_service.changeStatus(state, userId, checkoutId)
 return res.send(changeOrden)
}

exports.admin_all_get = async (req, res, next) => {
  const userId = req.params.userId
  const allUsers = await user_service.findAllByAdmin(userId)
  return res.send(allUsers)
}

exports.admin_user_delete = async (req, res, next) => {
  const userId = req.params.userId
  const deleteUserID = req.params.deleteUserID
  const erasedUser = await user_service.deleteUser(userId, deleteUserID)
  return res.send(erasedUser)
}

exports.admin_new_admin_put = async (req, res, next) => {
  const userId = req.params.userId
  const newAdminId = req.params.newAdminId
  const Admin = await user_service.newAdmin(userId, newAdminId)
  return res.send(Admin)
}

exports.user_find_by_id_get = async (req, res) => {
  const id = req.params.id
  const foundUser = await user_service.findById(id)
  return res.send(foundUser)
}

exports.user_create_post = async (req, res) => {
  const { name, lastName, email, uid } = req.body;
  const newUser = await user_service.createUser(name, lastName, email, uid)
  return res.send(newUser)
}

exports.user_edit_put = async (req, res) => {
  const id = req.params.id
  const { name, lastName, uid, isAdmin } = req.body;
  const editUser = await user_service.updateUser(id, name, lastName, uid, isAdmin )
  return res.send(editUser)
}

exports.user_find_by_uid_get = async (req, res) => {
  const uid = req.params.uid
  const uidFound = await user_service.findByUid(uid)
  return res.send(uidFound)
}

exports.user_seed_admin = async (req, res) => {
  const data = req.params
  const newAdmin = await user_service.seedAdmin(data)
  return res.send(newAdmin)
}