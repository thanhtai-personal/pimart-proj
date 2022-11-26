const getKeyInCurlyBrackets = (des) => {
    let bracket1 = [];
    let bracket2 = [];
    for (let i = 0; i < des.length; i++) {
        if (des[i] === "{") {
            bracket1.push(i);
        }
        if (des[i] === "}") {
            bracket2.push(i);
        }
    }
    if (bracket1.length === 0) {
        return
    }
    let keys = [];
    for (let i = 0; i < bracket1.length; i++) {
        keys.push(des.slice(bracket1[i], bracket2[i] + 1))
    }
    return keys;
}

const getValueInCurlyBrackets = (keys, skillConfig, skillCode) => {
    let obj = {};
    for (let key of keys) {
        const keyString = key.replace(/{/g, "").replace(/}/g, "")
        const keyInSkillObj = keyString.split(".");
        if (keyInSkillObj.length === 1) {
            obj[key] = skillConfig[skillCode][keyInSkillObj[0]];
        }
        else {

            const rs = skillConfig[skillCode].effects.find(item => item[`codeName`] === keyInSkillObj[0]);
            obj[key] = rs[keyInSkillObj[1]]
        }
    }
    return obj;
}

const getSkillName = (skillName, image) => {

    if (image) {
        if (skillName.indexOf("_") !== -1)
            return skillName.replace(/_/g, "")
        else
            return skillName.replace(/ /g, "")
    }
    else
        return skillName.replace(/_/g, " ")

}

export const convertSkillDes = (skillConfig, _skillDesc) => {
    var skillDesc = [];

    for (let i of _skillDesc) {
        let { key: skillCode, description } = i;
        let keys = getKeyInCurlyBrackets(description) as any
        let values = getValueInCurlyBrackets(keys, skillConfig, skillCode);
        for (let k of keys) {
            description = description.replace(k, values[k])
        }

        skillDesc.push({
            type: skillConfig[skillCode].ultimate ? 'Ultimate' : 'Passive',
            name: getSkillName(skillCode, false),
            description
        })
    }
    return skillDesc
}