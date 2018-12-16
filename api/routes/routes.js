'use strict';
const file = require('../controllers/fileController.js');
const folder = require('../controllers/folderController.js');
const share = require('../controllers/shareController.js');
const search = require('../controllers/searchController.js');
const host = require('../controllers/hostController.js');
const key = require('../controllers/apiKeyController.js');
/*const orbit_keyvalue = require('../controllers/orbitKeyValueController.js');*/
const multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });



module.exports = function(app) {

  /**
   * @swagger
   * /file:
   *   post:
   *     description: Upload a file on IpfsCloud
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: file uploaded
   */
 app.route('/file')
    .post(upload.single('file'), file.upload);

    /**
     * @swagger
     * /file/private:
     *   post:
     *     description: Upload a file on IpfsCloud on private section
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: file uploaded
     */
 app.route('/file/private')
    .post(upload.any(), file.secretUpload);

    /**
     * @swagger
     * /file/private:
     *   get:
     *     description: get a private file
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: your file
     */
 app.route('/file/private/:info')
    .get(file.getFile);

    /**
     * @swagger
     * /folder:
     *   post:
     *     description: upload a folder
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: folder uploaded
     */
 app.route('/folder')
 	.post(upload.any(), folder.upload);

  /**
   * @swagger
   * /folder/private:
   *   post:
   *     description: upload a folder in private
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: folder uploaded
   */
 app.route('/folder/private')
   .post(upload.any(), folder.secretUpload);

   /**
    * @swagger
    * /folder/private:
    *   get:
    *     description: reach a folder in private
    *     produces:
    *       - application/json
    *     responses:
    *       200:
    *         description: folder information
    */
 app.route('/folder/:id')
   .get(folder.getFolder);

   /**
    * @swagger
    * /folder/ls:
    *   get:
    *     description: display folder's content
    *     produces:
    *       - application/json
    *     responses:
    *       200:
    *         description: folder content
    */
 app.route('/folder/ls/:id')
 	.get(folder.ls);

 //DELETES BOTH FILE AND FOLDER
 /**
  * @swagger
  * /delete:
  *   post:
  *     description: delete file or folder
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: folder / file deleted
  */
 app.route('/delete')
 	.post(file.delete);

  /**
   * @swagger
   * /email:
   *   post:
   *     description: share by email
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: email sended
   */
 app.route('/email')
   .post(share.sendEmail);

   /**
    * @swagger
    * /host/:
    *   get:
    *     description: redirect
    *     produces:
    *       - application/json
    *     responses:
    *       200:
    *         description: redirected
    */
 app.route('/host/:url')
   .get(host.redirect);

   /**
    * @swagger
    * /host:
    *   get:
    *     description: upload a folder in private
    *     produces:
    *       - application/json
    *     responses:
    *       200:
    *         description: folder uploaded
    */
 app.route('/host')
   .post(upload.any(), host.upload)
   .get(host.isValidURL);
/* app.route('/orbit/keyvalue')
 	.get(orbit_keyvalue.show)*/


 //searching objects on IPFS (Thanks to https://github.com/ipfs-search/ipfs-search)
 /**
  * @swagger
  * /search:
  *   get:
  *     description: send a search request on https://github.com/ipfs-search/ipfs-search
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: search results
  */
 app.route('/search')
   .get(search.search);

   /**
    * @swagger
    * /metadata:
    *   get:
    *     description: get metadata for CID / IPFS Hash
    *     produces:
    *       - application/json
    *     responses:
    *       200:
    *         description: metadata results
    */
 app.route('/metadata/:id')
 	.get(search.metadata);


 //TODO: add authorization check for the masterKey. Only the masterKey has control over this route.
 /**
  * @swagger
  * /apiKey/search:
  *   post:
  *     description: genrate a api key
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: api key
  */
 app.route('/apiKey/create')
  .post(key.createKey);



};
