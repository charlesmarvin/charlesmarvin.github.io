const loadConfig = async () => {
  return fetch('./config.json').then((response) => response.json())
}
const loadData = async () => {
  return fetch('./data.json').then((response) => response.json())
}

class VtlCard extends HTMLElement {
  constructor() {
    super()
    const template = document.getElementById('vtl-card-tpl').content
    this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true))
  }

  connectedCallback() {
    const value = this.getAttribute('data-value')
    const rangeMin = this.getAttribute('data-range-min')
    const rangeMax = this.getAttribute('data-range-max')
    const unit = this.getAttribute('data-unit')

    const rangePercent = ((value - rangeMin) / (rangeMax - rangeMin)) * 100

    console.log(value, rangeMin, rangeMax, unit, rangePercent)
    const rangeValue = this.shadowRoot.querySelector('.vtl-range-value')
    rangeValue.textContent = value
    rangeValue.style.textIndent = `${23 + rangePercent}%`
    const rangeBarValue = this.shadowRoot.querySelector('.vtl-range-bar-value')
    rangeBarValue.style.left = `${25 + rangePercent}%`
    this.shadowRoot.querySelector('.vtl-range-min-value').textContent = rangeMin
    this.shadowRoot.querySelector('.vtl-range-max-value').textContent = rangeMax
  }
}

class VtlCardList extends HTMLElement {
  loading = false
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    // const template = document.getElementById('vtl-card-tpl').content
    // this.attachShadow({ mode: 'closed' }).appendChild(template.cloneNode(true))
  }

  async connectedCallback() {
    const config = await loadConfig()
    const data = await loadData()

    const componentsByShortName = {}
    config.components.forEach((c) => {
      componentsByShortName[c.shortName.toLowerCase()] = c
    })
    const list = document.createElement('div')
    data.forEach((datum) => {
      const cfg = componentsByShortName[datum[1].toLowerCase()]
      if (!cfg) {
        console.log('Now config provided for ', datum)
        return
      }
      const card = document.createElement('vtl-card')
      const slot = document.createElement('slot')
      const sex = 'male'
      slot.slot = 'vtl-name'
      slot.textContent = datum[1]
      card.appendChild(slot)
      card.setAttribute('data-value', parseFloat(datum[2]).toFixed(1))

      card.setAttribute('data-range-min', cfg.normalRange[sex].min.toFixed(1))
      card.setAttribute('data-range-max', cfg.normalRange[sex].max.toFixed(1))
      list.appendChild(card)
    })
    this.shadowRoot.append(list)
  }
}

customElements.define('vtl-card-list', VtlCardList)
customElements.define('vtl-card', VtlCard)
