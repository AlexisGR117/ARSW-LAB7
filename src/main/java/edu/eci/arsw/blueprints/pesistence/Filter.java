package edu.eci.arsw.blueprints.pesistence;

import edu.eci.arsw.blueprints.model.Blueprint;

import java.util.HashSet;
import java.util.Set;

public abstract class Filter {
    public abstract Blueprint filterBlueprint(Blueprint blueprint);

    public Set<Blueprint> filterBlueprints(Set<Blueprint> blueprints) {
        Set<Blueprint> newBlueprints = new HashSet<>();
        blueprints.forEach(blueprint -> newBlueprints.add(filterBlueprint(blueprint)));
        return newBlueprints;
    }
}
