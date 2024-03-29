class MinimaxAgent(MultiAgentSearchAgent):
    """
    Your minimax agent (question 2)
    """

    def getAction(self, gameState):
        """
          Returns the minimax action from the current gameState using self.depth
          and self.evaluationFunction.

          Here are some method calls that might be useful when implementing minimax.    

          gameState.getLegalActions(agentIndex):
            Returns a list of legal actions for an agent
            agentIndex=0 means Pacman, ghosts are >= 1

          Directions.STOP:
            The stop direction, which is always legal

          gameState.generateSuccessor(agentIndex, action):
            Returns the successor game state after an agent takes an action

          gameState.getNumAgents():
            Returns the total number of agents in the game
        """
        minimax = self.minimax(gameState, agentIndex=0, depth=self.depth)
        return minimax['action']

    def minimax(self, gameState, agentIndex=0, depth='2', action=Directions.STOP):
        agentIndex = agentIndex % gameState.getNumAgents()
        if agentIndex == 0: 
            depth = depth-1

        if gameState.isWin() or gameState.isLose() or depth == -1:
            return {'value':self.evaluationFunction(gameState), 'action':action}
        else:
            if agentIndex == 0: 
                return self.maxValue(gameState,agentIndex,depth)
            else: 
                return self.minValue(gameState,agentIndex,depth)

    def maxValue(self, gameState, agentIndex, depth):
        v = {'value':float('-inf'), 'action':Directions.STOP}
        legalMoves = gameState.getLegalActions(agentIndex)        
        for action in legalMoves:
            if action == Directions.STOP: continue
            successorGameState = gameState.generateSuccessor(agentIndex, action) 
            successorMinMax = self.minimax(successorGameState, agentIndex+1, depth, action)
            if v['value'] <= successorMinMax['value']:
                v['value'] = successorMinMax['value']
                v['action'] = action
        return v

    def minValue(self, gameState, agentIndex, depth):
        v = {'value': float('inf'), 'action': Directions.STOP}
        legalMoves = gameState.getLegalActions(agentIndex)
        for action in legalMoves:
            if action == Directions.STOP: continue
            successorGameState = gameState.generateSuccessor(agentIndex, action)
            successorMinMax = self.minimax(successorGameState, agentIndex + 1, depth, action)
            if v['value'] >= successorMinMax['value']:
                v['value'] = successorMinMax['value']
                v['action'] = action
        return v