export const gameStatus = {
  created: 'created',
  active: 'active',
  stopped: 'stopped',
  finished: 'finished'
}

export const isCreated = ({ status }) => status === gameStatus.created
export const isActive = ({ status }) => status === gameStatus.active
