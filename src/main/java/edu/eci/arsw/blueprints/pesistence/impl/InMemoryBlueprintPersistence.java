/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.pesistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.pesistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.pesistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.pesistence.BlueprintsPersistence;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author hcadavid
 */
@Service
public class InMemoryBlueprintPersistence implements BlueprintsPersistence {

    private final Map<Tuple<String, String>, Blueprint> blueprints = new ConcurrentHashMap<>();


    public InMemoryBlueprintPersistence() {
        //load stub data
        Point[] pts = new Point[]{new Point(140, 140), new Point(115, 115)};
        Blueprint bp = new Blueprint("_authorname_", "_bpname_ ", pts);
        blueprints.put(new Tuple<>(bp.getAuthor(), bp.getName()), bp);
        Point[] pts1 = new Point[]{new Point(94, 117), new Point(105, 85), new Point(20, 56)};
        Blueprint bp1 = new Blueprint("Jon", "My paint 2.0", pts1);
        blueprints.put(new Tuple<>(bp1.getAuthor(), bp1.getName()), bp1);
        Point[] pts2 = new Point[]{new Point(200, 200), new Point(200, 320), new Point(310, 320),
                new Point(310, 200), new Point(200, 200), new Point(250, 100), new Point(310, 200)};
        Blueprint bp2 = new Blueprint("Jon", "house", pts2);
        blueprints.put(new Tuple<>(bp2.getAuthor(), bp2.getName()), bp2);
        Point[] pts3 = new Point[]{new Point(90, 20), new Point(200, 200)};
        Blueprint bp3 = new Blueprint("Mario", "Is paint", pts3);
        blueprints.put(new Tuple<>(bp3.getAuthor(), bp3.getName()), bp3);
    }

    @Override
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        if (blueprints.putIfAbsent(new Tuple<>(bp.getAuthor(), bp.getName()), bp) != null) {
            throw new BlueprintPersistenceException(BlueprintPersistenceException.EXISTING_BLUEPRINT + bp);
        }
    }

    @Override
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException {
        Blueprint blueprint = blueprints.get(new Tuple<>(author, bprintname));
        if (blueprint == null) throw new BlueprintNotFoundException(BlueprintNotFoundException.BLUEPRINT_NOT_FOUND);
        return blueprint;
    }

    @Override
    public Set<Blueprint> getBlueprintByAuthor(String author) throws BlueprintNotFoundException {
        Set<Blueprint> bluePrintAuthor = new HashSet<>();
        blueprints.forEach((key, value) -> {
            if (key.getElem1().equals(author)) {
                bluePrintAuthor.add(value);
            }
        });
        if (bluePrintAuthor.isEmpty()) {
            throw new BlueprintNotFoundException(BlueprintNotFoundException.AUTHOR_NOT_FOUND);
        }
        return bluePrintAuthor;
    }

    @Override
    public Set<Blueprint> getAllBlueprints() {
        return new HashSet<>(blueprints.values());
    }

    @Override
    public void updateBlueprint(String author, String bpname, Blueprint bpUpdate) throws BlueprintNotFoundException {
        Blueprint bpActual = getBlueprint(author, bpname);
        bpActual.setPoints(bpUpdate.getPoints());
    }

    public void deleteBlueprint(String author, String bpname) throws BlueprintNotFoundException {
        Tuple<String, String> tuple = new Tuple<>(author, bpname);
        Blueprint blueprint = blueprints.get(tuple);
        if (blueprint == null) throw new BlueprintNotFoundException(BlueprintNotFoundException.BLUEPRINT_NOT_FOUND);
        blueprints.remove(tuple);
    }
}
