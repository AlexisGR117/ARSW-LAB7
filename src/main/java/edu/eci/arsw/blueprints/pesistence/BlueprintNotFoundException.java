/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.pesistence;

/**
 * @author hcadavid
 */
public class BlueprintNotFoundException extends Exception {

    public static final String AUTHOR_NOT_FOUND = "The given author doesn't exist.";
    public static final String BLUEPRINT_NOT_FOUND = "No such blueprint.";

    public BlueprintNotFoundException(String message) {
        super(message);
    }

    public BlueprintNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

}