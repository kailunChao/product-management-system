import mitt from 'mitt'

type Events = {
  'panel-delete-button': [string, boolean]
}

const eventBus = mitt<Events>()

export default eventBus
