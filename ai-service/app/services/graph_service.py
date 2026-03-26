from collections import deque

from app.data.phishing_graph import PHISHING_GRAPH, SUSPICIOUS_NODES


def _closest_known_node(url: str) -> str:
    if url in PHISHING_GRAPH:
        return url

    for node in PHISHING_GRAPH:
        if any(token and token in node for token in url.split("/")):
            return node

    return "http://secure-login-verify-bank.example-alert.com/update"


def bfs(start_url: str) -> list[str]:
    start = _closest_known_node(start_url)
    visited = {start}
    queue = deque([start])
    traversal = []

    while queue:
        current = queue.popleft()
        traversal.append(current)

        for neighbor in PHISHING_GRAPH.get(current, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return traversal


def dfs(start_url: str) -> list[str]:
    start = _closest_known_node(start_url)
    visited = set()
    traversal = []

    def traverse(node: str) -> None:
        visited.add(node)
        traversal.append(node)

        for neighbor in PHISHING_GRAPH.get(node, []):
            if neighbor not in visited:
                traverse(neighbor)

    traverse(start)
    return traversal


def analyze_graph(url: str) -> dict:
    bfs_chain = bfs(url)
    dfs_chain = dfs(url)
    connected_suspicious = [node for node in bfs_chain if node in SUSPICIOUS_NODES]

    return {
        "bfs_chain": bfs_chain,
        "dfs_chain": dfs_chain,
        "network_depth": max(len(bfs_chain) - 1, 0),
        "connected_suspicious_nodes": connected_suspicious,
    }
