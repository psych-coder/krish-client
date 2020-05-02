import { convertToRaw } from "draft-js";

export default {
  getTitle(rawContent) {
    //console.log(convertToRaw(editorState.getCurrentContent()));
    const blocks = rawContent.blocks;
    const value = blocks
      .map((block,index) => (!block.text.trim() && "\n") || block.text)[0]
    return value;
  },

  getShortDesc(rawContent){
    const blocks = rawContent.blocks;
    const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    return value.substring(0, 100);    
  },


};
