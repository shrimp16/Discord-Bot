//This certainly needs a better name

function fixTag(tag){
    return tag.substring(3, tag.length - 1);
}

module.exports = fixTag;