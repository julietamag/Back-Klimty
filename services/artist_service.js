const { Artist, Product, User } = require("../models");


const findById = async (id) => {
    try {
        const foundArtist = await Artist.findOne({
          where: { id: id, }, include: { model: Product }})
        return foundArtist
      }
      catch (err) {
       return (err)
      }
}

const findAllArtist = async () => {
    try {
        const allArtist = await Artist.findAll()
        return allArtist
      } catch (err) {
       return err
      }
}

const createBulk = async (artists) => {
    try {
        const bulkArtists = await Artist.bulkCreate(artists)
        return bulkArtists
      } catch (err) {
        return(err)
      }
}

const deleteArtist = async (userId, artistId) => {
    try {
        const admin = await User.findByPk(userId)
        if (admin.isAdmin === true) {
          const artistToDelete = await Artist.findByPk(artistId)
         await artistToDelete.destroy()
          return "Artist deleted from database"
        } else {
          return {error: "Account is not admin"}
        }
      } catch (err) {
        return(err)
      }
}

const addArtist = async (userId, title, description) => {
    try {
        const admin = await User.findByPk(userId)
        if (admin.isAdmin === true) {
          const newArtist = await Artist.create({title, description})
          return newArtist
        } else {
          return {error: "Account is not admin"}
        }
      } catch (err) {
        return(err)
      }
}

const editArtist = async (userId, artistId, title, description) => {
    try {
        const admin = await User.findByPk(userId)
        if (admin.isAdmin === true) {
          const artistToEdit = await Artist.findByPk(artistId)
         const editedArtist = await artistToEdit.update({title, description})
          return editedArtist
        } else {
          return {error: "Account is not admin"}
        }
      } catch (err) {
        return(err)
      }
}

module.exports = { findById, findAllArtist, createBulk, deleteArtist, addArtist, editArtist }