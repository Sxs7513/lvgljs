import { colorTransform } from './color'
import { FontStyle } from './font'
import { ScrollStyle } from './scroll'

function NormalizePx (key, value, result) {
    if (!isNaN(value)) {
        return result[key] = value
    }

    const reg = /(\d+\.?\d*)(px)?$/
    value = value.match(reg)?.[1]

    if (!isNaN(value)) {
        result[key] = value
    }
}

function NormalizePxOrPercent (key, value, result) {
    if (!isNaN(value)) {
        return result[key] = value
    }

    const reg1 = /(\d+\.?\d*)(%)?$/
    const reg2 = /(\d+\.?\d*)(px)?$/

    const value2 = value.match(reg2)?.[1]
    if (!isNaN(value2)) {
        return result[key] = value2
    }

    const value1 = value.match(reg1)?.[1]
    if (!isNaN(value1)) {
        return result[`${key}_pct`] = value1
    }
}

function NormalizeEnum (obj) {
    return (key, value, result) => {
        if (obj[value]) {
            result[key] = obj[value]
        }
    }
}

function NormalizeColor (key, value, result) {
    value = colorTransform(value)
    if (!isNaN(value)) {
        result[key] = value
    }
}

// normal
function NormalStyle (style, result) {
    const keys = Object.keys(style)

    const obj = {
        'height': NormalizePxOrPercent,
        'width': NormalizePxOrPercent,
        'left': NormalizePxOrPercent,
        'top': NormalizePxOrPercent,
        'background-color': NormalizeColor,
        'padding-left': NormalizePx,
        'padding-right': NormalizePx,
        'padding-top': NormalizePx,
        'padding-bottom': NormalizePx,
        'border-radius': NormalizePx,
        'border-width': NormalizePx,
        'border-opacity': NormalizePx,
        'border-color': NormalizeColor,
        'border-side': NormalizeEnum({
            left: 0x04,
            right: 0x08,
            full: 0x0F,
            top: 0x02,
            bottom: 0x01,
        }),
        'outline-width': NormalizePx,
        'outline-opacity': NormalizePx,
        'outline-color': NormalizeColor,
        'font-size': NormalizePx,
        'color': NormalizeColor,
    }

    keys.forEach(key => {
        if (obj[key]) {
            obj[key](key, style[key], result)
        }
    })

    return result
}

function AbbreviationStyle (style, result) {
    const keys = Object.keys(style)

    const obj = {
        'padding': ['padding-left', 'padding-top', 'padding-right', 'padding-bottom'],
    }

    keys.forEach(key => {
        if (obj[key]) {
            const value = style[key]
            const styleKeys = obj[key]
            if (typeof value == 'number') {
                styleKeys.forEach(styleKey => {
                    result[styleKey] = value
                })
            } else if (typeof value == 'string') {
                const values = value.split(/\s/)
                const len = values.length
                switch (len) {
                    case 2:
                        NormalizePx(styleKeys[0], values[1], result)
                        NormalizePx(styleKeys[2], values[1], result)
                        NormalizePx(styleKeys[1], values[0], result)
                        NormalizePx(styleKeys[3], values[0], result)
                    case 4:
                        NormalizePx(styleKeys[0], values[0], result)
                        NormalizePx(styleKeys[1], values[1], result)
                        NormalizePx(styleKeys[2], values[2], result)
                        NormalizePx(styleKeys[3], values[3], result)
                    case 3:
                        NormalizePx(styleKeys[1], values[0], result)
                        NormalizePx(styleKeys[0], values[1], result)
                        NormalizePx(styleKeys[2], values[1], result)
                        NormalizePx(styleKeys[3], values[2], result)
                }
            }
        }
    })

    return result
}

function FlexStyle (style, result) {
    if (style.display !== 'flex') return result

    let flexFlow = 0x00
    const flexDirection = style['flex-direction'] || 'row'
    const flexWrap = style['flex-wrap'] || 'nowrap'
    
    const flexFlowObj = {
        'row_nowrap': 0x00,
        'column_nowrap': 1 << 0,
        'row_wrap': 0x00 | 1 << 2,
        'column_wrap': 1 << 0 | 1 << 2,
        'row_wrap-reverse': 0x00 | 1 << 2 | 1 << 3,
        'column_wrap-reverse': 1 << 0 | 1 << 2 | 1 << 3,
        'row_reverse': 0x00 | 1 << 3,
        'column_reverse': 0x00 | 1 << 3
    }

    if (flexFlowObj[`${flexDirection}_${flexWrap}`]) {
        flexFlow = flexFlowObj[`${flexDirection}_${flexWrap}`]
    }
    result['flex-flow'] = flexFlow

    let mainPlace = 0
    let crossPlace = 0
    let trackCrossPlace = 0
    const justifyContent = style['justify-content'] || 'flex-start'
    const alignItems = style['align-items'] || 'flex-start'
    const alignContent = style['align-content'] || 'flex-start'
    const flexAlignObj = {
        'flex-start': 0,
        'flex-end': 1,
        'center': 2,
        'space-evenly': 3,
        'space-around': 4,
        'space-between': 5
    }
    if (flexAlignObj[justifyContent]) {
        mainPlace = flexAlignObj[justifyContent]
    }
    if (flexAlignObj[alignItems]) {
        crossPlace = flexAlignObj[alignItems]
    }
    if (flexAlignObj[alignContent]) {
        trackCrossPlace = flexAlignObj[alignContent]
    }
    result['flex-align'] = [mainPlace, crossPlace, trackCrossPlace]

    if (!isNaN(style['flex-grow'])) {
        result['flex-grow'] = style['flex-grow']
    }
    return result
}

function GridStyle (style, result) {

}

class StyleSheet {
    static transformStyle;

    static pipeline (args) {
        StyleSheet.transformStyle = (style) => {
            const result = args.reduce(
                (prev, func) => func(style, prev),
                {}
            )
            return result
        } 
    }

    static transform(style) {
        const result = StyleSheet.transformStyle(style)

        return result
    }

    static create () {
        
    }
}

StyleSheet.pipeline([
    NormalStyle,
    AbbreviationStyle,
    FlexStyle,
    FontStyle,
    ScrollStyle
])

export default StyleSheet