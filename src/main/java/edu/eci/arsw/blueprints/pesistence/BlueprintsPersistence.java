/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.pesistence;


import edu.eci.arsw.blueprints.model.Blueprint;

import java.util.Set;

/**
 * @author hcadavid
 */
public interface BlueprintsPersistence {

    /**
     * @param bp the new blueprint
     * @throws BlueprintPersistenceException if a blueprint with the same name already exists,
     *                                       or any other low-level persistence error occurs.
     */
    void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException;

    /**
     * @param author     blueprint's author
     * @param bprintname blueprint's author
     * @return the blueprint of the given name and author
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException;

    /**
     * @param author blueprint's author
     * @return the set of blueprints of the given author
     * @throws BlueprintNotFoundException if the given author doesn't exist
     */
    Set<Blueprint> getBlueprintByAuthor(String author) throws BlueprintNotFoundException;

    /**
     * @return the set of existing blueprints
     */
    Set<Blueprint> getAllBlueprints();

    /**
     * @param author   blueprint's author
     * @param bpname   blueprint's author
     * @param bpUpdate blueprint's updated
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    void updateBlueprint(String author, String bpname, Blueprint bpUpdate) throws BlueprintNotFoundException;

}
