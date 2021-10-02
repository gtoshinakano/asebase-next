import {PARENTESCOS} from './json-data'
import _ from 'lodash'
/*	1: [],
	2: ['Pai', 'Mãe'],
	3: ['Avô', 'Avó'],
	4: ['Bisavô', 'Bisavó'],
	5: ['Tataravô', 'Tataravó']*/

export const getOptsByGeneration = (gen) => {
  if(gen === 1){
    return {
      label: "Eu",
      value: null,
      disabled: true,
      selected:true,
      children: []
    }
  }
  if(gen === 2){
    return {
      label: "Eu",
      value: null,
      disabled: true,
      children: PARENTESCOS[gen].map((v,i) => {return {label:v,value:i.toString(),disabled:false}})
    }
  }
  if(gen === 3)
    return {
      label: "Eu",
      value: null,
      disabled: true,
      children: PARENTESCOS[2].map((v,i) => {return {
        label:v,
        value:i.toString(),
        disabled:false,
        children: PARENTESCOS[gen].map((v,j) => {return {label:v+PARENTESCOS[1][i],value:i + "-" + j,disabled:false}})
      }})
    }
  if(gen === 4)
    return {
      label: "Eu",
      value: null,
      disabled: true,
      children: PARENTESCOS[2].map((v,i) => {return {
        label:v,
        value:i.toString(),
        disabled: false,
        children: PARENTESCOS[3].map((v,j) => {return {
          label:v+PARENTESCOS[1][i],
          value:i + "-" + j,
          disabled: false,
          children: PARENTESCOS[4].map((v,k) => {
            return {
              label:v+PARENTESCOS[1][i],
              value:i + "-" + j + "-" + k,
              disabled: false
            }
          })
        }})
      }})
    }
  if(gen === 5)
    return {
      label: "Eu",
      value: null,
      disabled: true,
      children: PARENTESCOS[2].map((v,i) => {return {
        label:v,
        value:i.toString(),
        disabled: false,
        children: PARENTESCOS[3].map((v,j) => {return {
          label:v+PARENTESCOS[1][i],
          value:i + "-" + j,
          disabled: false,
          children: PARENTESCOS[4].map((v,k) => {
            return {
              label:v+PARENTESCOS[1][i],
              value:i + "-" + j + "-" + k,
              disabled: false,
              children: PARENTESCOS[gen].map((v,l) => {
                return {
                  label:v+PARENTESCOS[1][i],
                  value:i + "-" + j + "-" + k + "-" + l,
                  disabled: false
                }
              })
            }
          })
        }})
      }})
    }
    return PARENTESCOS[2].map((v,i) => {
      return {
        label:v,
        value:i.toString(),
        disabled: true,
        children: PARENTESCOS[3].map((v,j) => {
          return {
            label:v+PARENTESCOS[1][i],
            value:i + "-" + j,
            disabled: false,
            children: PARENTESCOS[4].map((v,k) => {
              return {
                label:v+PARENTESCOS[1][i],
                value:i + "-" + j + "-" + k,
                disabled: false,
                children: PARENTESCOS[5].map((v,l) => {
                  return {
                    label:v+PARENTESCOS[1][i],
                    value:i + "-" + j + "-" + k + "-" + l,
                    disabled: false
                  }
                })
              }
            })
          }
        })
      }
    })
}

export const newItemsBySelected = (selected, data) => {
  let ret = data
  _.forEach(selected, (s) => {
    if(s.length === 1){
      ret = {
        ...ret,
        children: ret.children.map((c) => {
          if(c.value === s) return {
            ...c,
            selected: true,
            children: []
          }
          else return c
        })
      }
    }
    if(s.length === 3){
      ret = {
        ...ret,
        children: ret.children.map((c) => {
          if(c.children)
            return {
              ...c,
              children: c.children.map((d) => {
                if(d.value === s) return {
                  ...d,
                  selected: true,
                  children: []
                }
                else return d
              })
            }
          else return c
        })
      }
    }
    if(s.length === 5){
      ret = {
        ...ret,
        children: ret.children.map((c) => {
          if(c.children)
            return {
              ...c,
              children: c.children.map((d) => {
                if(d.children)
                  return {
                    ...d,
                    children: d.children.map((e) => {
                      if(e.value === s) return {
                        ...e,
                        selected: true,
                        children: []
                      }
                      else return e
                    })
                  }
                else return d
              })
            }
          else return c
        })
      }
    }
    if(s.length === 7){
      ret = {
        ...ret,
        children: ret.children.map((c) => {
          if(c.children)
            return {
              ...c,
              children: c.children.map((d) => {
                if(d.children)
                  return {
                    ...d,
                    children: d.children.map((e) => {
                      if(e.children)
                        return {
                          ...e,
                          children: e.children.map((f) => {
                            if(f.value === s) return {
                              ...f,
                              selected: true,
                              children: []
                            }
                            else return f
                          })
                        }
                      else return e
                    })
                  }
                else return d
              })
            }
          else return c
        })
      }
    }
  })
  return ret
}

export const generationsExample = ['', 'Você é um(a) imigrante japonês(a).', 'Pelo menos um dos seus pais é imigrante japonês.', 'Pelo menos um dos seus avós é imigrante japonês.', 'Pelo menos um dos seus bisavós foi imigrante japonês.', 'Pelo menos um dos seus tataravós foi imigrante japonês.']

export const generations = ['', 'Issei', 'Nisei', 'Sansei', 'Yonsei', 'Gosei']
