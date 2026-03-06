//
//  GDLandscapingClipApp.swift
//  GDLandscapingClip
//
//  Created by David Richter on 2/18/26.
//

import SwiftUI
import CoreData

@main
struct GDLandscapingClipApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
