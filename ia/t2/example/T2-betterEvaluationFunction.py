def betterEvaluationFunction(currentGameState):
    """
      Your extreme ghost-hunting, pellet-nabbing, food-gobbling, unstoppable
      evaluation function (question 5).

      DESCRIPTION: <write something here so we know what you did>
    """

    # prioriza o estado que leva à vitória
    if currentGameState.isWin():
        return float("+inf")

    # estado de derrota corresponde à pior avaliação
    if currentGameState.isLose():
        return float("-inf")

    # variáveis a serem usadas na cálculo da função de avaliação
    score = scoreEvaluationFunction(currentGameState)
    newFoodList = currentGameState.getFood().asList()
    newPos = currentGameState.getPacmanPosition()

    #
    # ATENÇÃO: variáveis não usadas AINDA!
    # Procure modificar essa função para usar essas variáveis e melhorar a função de avaliação.
    # Descreva em seu relatório de que forma essas variáveis foram usadas.
    #
    ghostStates = currentGameState.getGhostStates()
    scaredTimes = [ghostState.scaredTimer for ghostState in ghostStates]

    # calcula distância entre o agente e a pílula mais próxima
    minDistanceFood = float("+inf")

    for foodPos in newFoodList:
        minDistanceFood = min(
            minDistanceFood, util.manhattanDistance(foodPos, newPos))

    # incentiva o agente a se aproximar mais da pílula mais próxima
    score -= 2 * minDistanceFood

    # incentiva o agente a comer pílulas
    score -= 4 * len(newFoodList)

    # incentiva o agente a se mover para príximo das cápsulas
    capsulelocations = currentGameState.getCapsules()
    score -= 4 * len(capsulelocations)

    return score
