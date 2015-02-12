/* globals SharedWithRule: true */

SharedWithRule = function () {

};

SharedWithRule.schema = {
  /**
   * The id of the user that the file is shared with.
   */
  userId: {
    type: String
  },
  /**
   * The access rights to the file.
   * Must be a value of the FileAccess enumeration.
   */
  access: {
    type: Number
  },
  /**
   * An inherited shartedWithRule was set on a parent folder.
   */
  isInherited: {
    type: Boolean,
    defaultValue: false
  }
};
