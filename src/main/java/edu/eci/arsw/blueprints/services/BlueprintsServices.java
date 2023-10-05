/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.services;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.pesistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.pesistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.pesistence.BlueprintsPersistence;
import edu.eci.arsw.blueprints.pesistence.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * @author hcadavid
 */
@Service
public class BlueprintsServices {

    @Autowired
    BlueprintsPersistence bpp = null;
    @Autowired
    Filter filter;

    public void addNewBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        bpp.saveBlueprint(bp);
    }

    public void updateBlueprint(String author, String bpname, Blueprint blueprintUpdated) throws BlueprintNotFoundException {
        bpp.updateBlueprint(author, bpname, blueprintUpdated);
    }

    public Set<Blueprint> getAllBlueprints() {
        return filter.filterBlueprints(bpp.getAllBlueprints());
    }

    /**
     * @param author blueprint's author
     * @param name   blueprint's name
     * @return the blueprint of the given name created by the given author
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Blueprint getBlueprint(String author, String name) throws BlueprintNotFoundException {
        return filter.filterBlueprint(bpp.getBlueprint(author, name));
    }

    /**
     * @param author blueprint's author
     * @return all the blueprints of the given author
     * @throws BlueprintNotFoundException if the given author doesn't exist
     */
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException {
        return filter.filterBlueprints(bpp.getBlueprintByAuthor(author));
    }
}
