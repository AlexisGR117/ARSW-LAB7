/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.model;

import java.util.Objects;

/**
 * @author hcadavid
 */
public class Point {

    private int x;
    private int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public Point() {
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null) return false;
        if (getClass() != obj.getClass()) return false;
        final Point other = (Point) obj;
        if (!Objects.equals(this.getX(), other.getX())) return false;
        return Objects.equals(this.getY(), other.getY());
    }

    @Override
    public int hashCode() {
        return Integer.parseInt(x + Integer.toString(y));
    }

    @Override
    public String toString() {
        return x + "-" + y;
    }
}
